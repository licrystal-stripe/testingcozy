import {useState } from 'react'
import Layout from "@/components/Layout";
import {useRouter } from 'next/router';

import {
  Radio,
  RadioGroup,
} from '@headlessui/react'
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { productPageDetails, reviews, relatedProducts } from '@/utils/constants';


const policies = [
  { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  

  return (
    <div></div>
  )
}


