export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <h1>Detalhes do anúncio: {(await params).id}</h1>;
}
