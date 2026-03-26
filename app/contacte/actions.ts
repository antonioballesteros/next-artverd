"use server";

export async function submitContactForm(formData: FormData) {
  const payload = {
    nom: String(formData.get("nom") ?? "").trim(),
    correu: String(formData.get("correu") ?? "").trim(),
    missatge: String(formData.get("missatge") ?? "").trim(),
  };
  console.log("[contact form]", payload);
}
