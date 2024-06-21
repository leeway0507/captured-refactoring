import { fetchProductList } from '@/hooks/data/product-list-fetch'
import { ProductCardArr, Container, FixedCardTitle } from './_component'

export default async function BrandItemsLayOut({
    brandName,
    maxItems = 6,
}: {
    brandName: string
    maxItems?: number
}) {
    const filter = {
        sortBy: '최신순',
        brand: brandName,
    }

    const data = await fetchProductList(filter).then((res) => res.data)
    const container =
        'mx-auto w-full layout-max-frame flex flex-col gap-2 md:grid md:auto-cols-auto md:grid-flow-col md:px-4 px-1'

    const productCardBox =
        'grid grid-cols-2 md:grid-cols-3 md:px-2 gap-1 place-content-between h-full'
    return (
        <Container className={`${container}`}>
            <section className="w-full max-w-[400px] md:max-w-[600px] 2xl:max-w-[650px]">
                <FixedCardTitle
                    src={`/layout/${brandName}.webp`}
                    href={`/shop/?brand=${brandName}`}
                    name={brandName}
                />
            </section>

            <section>
                <div className={`${productCardBox}`}>
                    <ProductCardArr data={data} maxItems={maxItems} />
                </div>
            </section>
        </Container>
    )
}
