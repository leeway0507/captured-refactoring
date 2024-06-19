import { fetchProductList } from '@/hooks/data/product-list-fetch'
import { ProductCardCarousel, Container, ResponsiveCardTitle } from './_component'

export default async function BrandItemsLayOutTop({ brandName }: { brandName: string }) {
    const filter = {
        sortBy: '최신순',
        brand: brandName,
    }

    const productResponse = await fetchProductList(filter)

    const container = 'layout-max-frame w-full bg-gray-50 py-4 mx-auto'
    return (
        <Container className={`${container}`}>
            <ProductCardCarousel productArr={productResponse.data} maxItems={10} />
            <ResponsiveCardTitle
                src={`/layout/${brandName}.webp`}
                href={`/shop/?brand=${brandName}`}
                name={brandName}
                aspect="aspect-[4/1] lg:aspect-[4/1]"
            />
        </Container>
    )
}
