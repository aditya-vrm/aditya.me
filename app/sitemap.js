export default async function sitemap() {
  const baseUrl = "https://aditya-me-two.vercel.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
