import {
    Radio,
    RadioGroup,
  } from '@headlessui/react'
import { useState } from 'react'
import { productPageDetails, classNames } from '@/utils/constants';

export default function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState(productPageDetails.colors[0])
    console.log(productPageDetails.colors)
    return (
        <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>

                <fieldset aria-label="Choose a color" className="mt-2">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {productPageDetails.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          color.selectedColor,
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                        {console.log(color.bgColor)} 
                        {console.log(color.selectedColor)}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
    )
}