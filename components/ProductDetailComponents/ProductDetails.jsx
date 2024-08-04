import { productPageDetails } from '@/utils/constants';

export default function ProductDetails () {
    return (
        <div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {productPageDetails.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    )
}