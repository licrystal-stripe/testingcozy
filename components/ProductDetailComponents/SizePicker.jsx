import { useState } from 'react'
import {
    Radio,
    RadioGroup,
  } from '@headlessui/react'
  import { productPageDetails, classNames } from '@/utils/constants';

export default function SizePicker () {
    const [selectedSize, setSelectedSize] = useState(productPageDetails.sizes[2])

    return (
        <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <a href="#" className="text-sm font-medium text-[#565c5c] hover:text-[#565c5c]">
                    See sizing chart
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-2">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                  >
                    {productPageDetails.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                          'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-[#a99a78] data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-[#1e2525] data-[focus]:ring-offset-2 data-[checked]:hover:bg-[#1e2525] sm:flex-1',
                        )}
                      >
                        {size.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
    )
}