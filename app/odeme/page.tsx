"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import {
  useOrderStore,
  cartItemsToOrderItems,
  generateOrderNumber,
  type ShippingAddress,
} from "@/lib/orderStore";
import { createClient } from "@/lib/supabase/client";

// ─── Validation Schema ─────────────────────────────────────────────
const addressSchema = z.object({
  fullName: z.string().min(3, "Ad soyad en az 3 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta girin."),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin.").max(15),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır."),
  city: z.string().min(2, "Şehir adı giriniz."),
  district: z.string().min(2, "İlçe adı giriniz."),
  postalCode: z.string().min(5, "Geçerli posta kodu girin.").max(10),
  country: z.string().min(2, "Ülke adı giriniz."),
});

const checkoutSchema = z
  .object({
    shipping: addressSchema,
    billingAddressSame: z.boolean(),
    billing: addressSchema.optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.billingAddressSame) {
        return !!data.billing && addressSchema.safeParse(data.billing).success;
      }
      return true;
    },
    { message: "Fatura adresi bilgilerini eksiksiz doldurun.", path: ["billing"] }
  );

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// ─── Field Component ───────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[10px] text-red-500 font-sans">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full border border-ivory-200 bg-transparent px-4 py-3 text-sm font-sans text-charcoal " +
  "placeholder-charcoal-lighter/40 focus:outline-none focus:border-gold transition-colors duration-300";

// ─── Address Form Block ────────────────────────────────────────────
function AddressFields({
  prefix,
  register,
  errors,
  defaultEmail,
}: {
  prefix: "shipping" | "billing";
  register: ReturnType<typeof useForm<CheckoutFormData>>["register"];
  errors: Partial<Record<string, { message?: string }>>;
  defaultEmail?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Ad Soyad *" error={errors[`${prefix}.fullName`]?.message}>
        <input
          {...register(`${prefix}.fullName`)}
          placeholder="Adınız Soyadınız"
          className={inputClass}
        />
      </Field>
      <Field label="Telefon *" error={errors[`${prefix}.phone`]?.message}>
        <input
          {...register(`${prefix}.phone`)}
          placeholder="+90 532 000 0000"
          className={inputClass}
        />
      </Field>
      <Field label="E-Posta *" error={errors[`${prefix}.email`]?.message}>
        <input
          {...register(`${prefix}.email`)}
          type="email"
          defaultValue={defaultEmail}
          placeholder="ornek@email.com"
          className={`${inputClass} sm:col-span-2`}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Adres *" error={errors[`${prefix}.address`]?.message}>
          <textarea
            {...register(`${prefix}.address`)}
            rows={2}
            placeholder="Mahalle, cadde, sokak, bina no, daire no"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>
      <Field label="İlçe *" error={errors[`${prefix}.district`]?.message}>
        <input
          {...register(`${prefix}.district`)}
          placeholder="İlçe"
          className={inputClass}
        />
      </Field>
      <Field label="Şehir *" error={errors[`${prefix}.city`]?.message}>
        <input
          {...register(`${prefix}.city`)}
          placeholder="Şehir"
          className={inputClass}
        />
      </Field>
      <Field label="Posta Kodu *" error={errors[`${prefix}.postalCode`]?.message}>
        <input
          {...register(`${prefix}.postalCode`)}
          placeholder="06000"
          className={inputClass}
        />
      </Field>
      <Field label="Ülke *" error={errors[`${prefix}.country`]?.message}>
        <input
          {...register(`${prefix}.country`)}
          placeholder="Türkiye"
          defaultValue="Türkiye"
          className={inputClass}
        />
      </Field>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export default function OdemePage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { user, isLoading } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not logged in or cart empty
  useEffect(() => {
    if (!mounted || isLoading) return;
    if (!user) { router.replace("/sepet"); return; }
    if (items.length === 0) { router.replace("/sepet"); return; }
  }, [mounted, isLoading, user, items, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billingAddressSame: true,
      shipping: {
        email: user?.email ?? "",
        country: "Türkiye",
        fullName: user?.user_metadata?.full_name ?? "",
      },
      billing: { country: "Türkiye" },
    },
  });

  const billingAddressSame = watch("billingAddressSame");
  const shippingCost = subtotal() >= 500000 ? 0 : 0; // Free shipping for now

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) return;
    setSubmitting(true);

    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();

    const order = {
      id: orderId,
      orderNumber,
      userId: user.id,
      userEmail: user.email ?? data.shipping.email,
      status: "confirmed" as const,
      items: cartItemsToOrderItems(items),
      subtotal: subtotal(),
      shippingCost,
      total: subtotal() + shippingCost,
      shippingAddress: data.shipping as ShippingAddress,
      billingAddressSame: data.billingAddressSame,
      billingAddress: data.billingAddressSame
        ? (data.shipping as ShippingAddress)
        : (data.billing as ShippingAddress),
      paymentMethod: "mock",
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    addOrder(order);

    // Try saving to Supabase
    try {
      const supabase = createClient();
      await supabase.from("orders").insert({
        id: orderId,
        order_number: orderNumber,
        user_id: user.id,
        user_email: order.userEmail,
        status: order.status,
        items: order.items,
        subtotal: order.subtotal,
        shipping_cost: order.shippingCost,
        total: order.total,
        shipping_address: order.shippingAddress,
        billing_address: order.billingAddress,
        payment_method: order.paymentMethod,
        notes: order.notes,
        created_at: order.createdAt,
      });
    } catch {
      // Silently fail — order is saved in localStorage
    }

    clearCart();
    router.push(`/siparis-onay/${orderId}`);
  };

  // Flatten errors for easier access
  const flatErrors: Record<string, { message?: string }> = {};
  if (errors.shipping) {
    Object.entries(errors.shipping).forEach(([k, v]) => {
      flatErrors[`shipping.${k}`] = v as { message?: string };
    });
  }
  if (errors.billing) {
    Object.entries(errors.billing).forEach(([k, v]) => {
      flatErrors[`billing.${k}`] = v as { message?: string };
    });
  }

  if (!mounted || isLoading) return null;
  if (!user || items.length === 0) return null;

  const totalFormatted = (subtotal() + shippingCost).toLocaleString("tr-TR");

  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen pt-44 pb-20 px-5 md:px-10 lg:px-16 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="section-overline text-gold">Ödeme</p>
          <h1 className="font-serif font-light text-charcoal text-3xl md:text-4xl mt-1">
            Sipariş Bilgileri
          </h1>
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mt-4">
            <Link href="/sepet" className="text-[9px] font-sans tracking-luxury uppercase text-charcoal-lighter hover:text-gold transition-colors">
              Sepet
            </Link>
            <span className="text-charcoal-lighter">›</span>
            <span className="text-[9px] font-sans tracking-luxury uppercase text-gold">Ödeme</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">
            {/* ── Left: Forms ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* Shipping Address */}
              <section>
                <h2 className="font-serif font-light text-charcoal text-xl mb-6 pb-4 border-b border-ivory-200">
                  Teslimat Adresi
                </h2>
                <AddressFields
                  prefix="shipping"
                  register={register}
                  errors={flatErrors}
                  defaultEmail={user.email ?? ""}
                />
              </section>

              {/* Billing Address */}
              <section>
                <h2 className="font-serif font-light text-charcoal text-xl mb-6 pb-4 border-b border-ivory-200">
                  Fatura Adresi
                </h2>
                <label className="flex items-center gap-3 cursor-pointer mb-6">
                  <input
                    type="checkbox"
                    {...register("billingAddressSame")}
                    className="accent-gold w-4 h-4"
                  />
                  <span className="text-sm font-sans text-charcoal">
                    Fatura adresi teslimat adresiyle aynı
                  </span>
                </label>
                {!billingAddressSame && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AddressFields
                      prefix="billing"
                      register={register}
                      errors={flatErrors}
                    />
                  </motion.div>
                )}
              </section>

              {/* Notes */}
              <section>
                <h2 className="font-serif font-light text-charcoal text-xl mb-6 pb-4 border-b border-ivory-200">
                  Sipariş Notu
                </h2>
                <Field label="Not (İsteğe Bağlı)">
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Kurye için özel talimat, hediye notu vb."
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </section>

              {/* Payment — Mock */}
              <section>
                <h2 className="font-serif font-light text-charcoal text-xl mb-6 pb-4 border-b border-ivory-200">
                  Ödeme Yöntemi
                </h2>
                <div className="border border-gold/30 bg-gold/5 p-5 flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full border-2 border-gold mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-sm text-charcoal font-medium">Kredi / Banka Kartı</p>
                    <p className="text-[10px] font-sans text-charcoal-lighter mt-1">
                      Ödeme altyapısı entegrasyonu tamamlandığında aktif olacaktır.
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      {["VISA", "MC", "TR"].map((b) => (
                        <span key={b} className="border border-ivory-200 px-2 py-1 text-[8px] font-sans text-charcoal-lighter tracking-widest">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right: Summary ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-ivory-50 p-8 space-y-6">
                <p className="section-overline text-gold">Sipariş Özeti</p>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {items.map(({ product, quantity, discountedPrice }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-14 h-16 shrink-0 bg-ivory-200 overflow-hidden">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-charcoal text-ivory-100 text-[8px] flex items-center justify-center font-sans">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] text-gold font-sans tracking-wider truncate">{product.category}</p>
                        <p className="text-sm font-serif font-light text-charcoal truncate">{product.name}</p>
                        <p className="text-[10px] font-sans text-charcoal mt-0.5">
                          ₺{((discountedPrice ?? product.price) * quantity).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-ivory-200 pt-5 space-y-3">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-charcoal-lighter">Ara Toplam</span>
                    <span className="font-serif">₺{subtotal().toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-charcoal-lighter">Kargo</span>
                    <span className="font-serif text-gold">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-ivory-200">
                    <span className="text-[9px] tracking-luxury uppercase font-sans text-charcoal-lighter">Toplam</span>
                    <span className="font-serif text-charcoal text-2xl font-light">₺{totalFormatted}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-luxury-filled w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sipariş Oluşturuluyor..." : "Siparişi Onayla"}
                  {!submitting && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </button>

                <p className="text-[9px] text-charcoal-lighter/60 font-sans text-center leading-relaxed">
                  Siparişi Onayla butonuna tıklayarak{" "}
                  <Link href="/kullanim-kosullari" className="underline hover:text-gold">Kullanım Koşulları</Link>{" "}
                  ve{" "}
                  <Link href="/gizlilik-politikasi" className="underline hover:text-gold">Gizlilik Politikası</Link>'nı
                  kabul etmiş olursunuz.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer hideNewsletter />
    </PageWrapper>
  );
}
