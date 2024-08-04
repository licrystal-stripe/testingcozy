import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Transition,
  } from '@headlessui/react'
  import { ChevronDownIcon } from '@heroicons/react/20/solid'
  const sortOptions = [
      { name: 'Most Popular', href: '#' },
      { name: 'Best Rating', href: '#' },
      { name: 'Newest', href: '#' },
      { name: 'Price: Low to High', href: '#' },
      { name: 'Price: High to Low', href: '#' },
    ]
    const filters = [
      {
        id: 'category',
        name: 'Category',
        options: [
          { value: 'tees', label: 'Tees' },
          { value: 'crewnecks', label: 'Crewnecks' },
          { value: 'hats', label: 'Hats' },
          { value: 'bundles', label: 'Bundles' },
          { value: 'carry', label: 'Carry' },
          { value: 'objects', label: 'Objects' },
        ],
      },
      {
        id: 'brand',
        name: 'Brand',
        options: [
          { value: 'clothing-company', label: 'Clothing Company' },
          { value: 'fashion-inc', label: 'Fashion Inc.' },
          { value: 'shoes-n-more', label: "Shoes 'n More" },
          { value: 'supplies-n-stuff', label: "Supplies 'n Stuff" },
        ],
      },
      {
        id: 'color',
        name: 'Color',
        options: [
          { value: 'white', label: 'White' },
          { value: 'black', label: 'Black' },
          { value: 'grey', label: 'Grey' },
          { value: 'blue', label: 'Blue' },
          { value: 'olive', label: 'Olive' },
          { value: 'tan', label: 'Tan' },
        ],
      },
      {
        id: 'sizes',
        name: 'Sizes',
        options: [
          { value: 'xs', label: 'XS' },
          { value: 's', label: 'S' },
          { value: 'm', label: 'M' },
          { value: 'l', label: 'L' },
          { value: 'xl', label: 'XL' },
          { value: '2xl', label: '2XL' },
        ],
      },
    ]

export default function Filters() {
    return (<section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
    <h2 id="filter-heading" className="sr-only">
      Product filters
    </h2>

    <div className="flex items-center justify-between">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <MenuItem key={option}>
                  {({ focus }) => (
                    <a
                      href={option.href}
                      className={ 'block px-4 py-2 text-sm font-medium text-gray-900'}
                    >
                      {option.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      <button
        type="button"
        className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        Filters
      </button>

      <PopoverGroup className="hidden sm:flex sm:items-baseline sm:space-x-8">
        {filters.map((section, sectionIdx) => (
          <Popover as="div" key={section.name} id="menu" className="relative inline-block text-left">
            <div>
              <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <span>{section.name}</span>
                {sectionIdx === 0 ? (
                  <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                    1
                  </span>
                ) : null}
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </PopoverButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <PopoverPanel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <form className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </form>
              </PopoverPanel>
            </Transition>
          </Popover>
        ))}
      </PopoverGroup>
    </div>
  </section>)
}