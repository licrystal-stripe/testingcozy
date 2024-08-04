import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Transition,
  } from '@headlessui/react'
  
  import {navigation} from '@/utils/constants'
  import { classNames } from '@/utils/constants';

{/** Navigation Bar Categories for Popups - (Women, Men, Company, Stores) */}
export default function NavigationBarCategories() {

    return (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-4">
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ openCart }) => (
                              <>
                                <div className="relative flex">
                                  <PopoverButton
                                    className={classNames(
                                      openCart ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-800',
                                      'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out',
                                    )}
                                  >
                                    {category.name}
                                    <span
                                      className={classNames(
                                        openCart ? 'bg-indigo-600' : '',
                                        'absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out',
                                      )}
                                      aria-hidden="true"
                                    />
                                  </PopoverButton>
                                </div>

                                <Transition
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <PopoverPanel className="absolute inset-x-0 top-full z-20 bg-white text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                    {/* Fake border when menu is open */}
                                    <div
                                      className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                      aria-hidden="true"
                                    >
                                      <div
                                        className={classNames(
                                          openCart ? 'bg-gray-200' : 'bg-transparent',
                                          'h-px w-full transition-colors duration-200 ease-out',
                                        )}
                                      />
                                    </div>

                                    <div className="relative">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                          {category.featured.map((item) => (
                                            <div key={item.name} className="group relative">
                                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                {item.name}
                                              </a>
                                              <p aria-hidden="true" className="mt-1">
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverPanel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </PopoverGroup>
                  </div>
    )

}
