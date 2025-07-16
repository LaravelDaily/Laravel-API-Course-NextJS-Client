export default async function Home() {
    const categoriesData = await fetch('http://demo.test/api/categories')
    const categories = await categoriesData.json()

    const productsData = await fetch('http://demo.test/api/products')
    const products = await productsData.json()

    return (
        <>
            <ul style={{display: "inline-block", marginBottom: "10px"}}>
                {categories.data.map((category) => (
                    <li style={{display: "inline-block"}} key={category.id}>{category.name}</li>
                ))}
            </ul>

            <ul>
                {products.data.map((product) => (
                    <li key={product.id}><strong>{products.name}</strong> ${product.price} <em>({product.category.name})</em>  </li>
                ))}
            </ul>
        </>
    );
}
