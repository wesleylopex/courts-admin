import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface Link {
  href: string
  label: string
  isCurrent?: boolean
}

interface Props {
  links: Link[]
}

export default function BreadcrumbHelper ({ links }: Props) {
  const normalLinks = links.filter(link => !link.isCurrent)
  const currentLink = links.find(link => link.isCurrent)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {normalLinks.map(link => (
            <>
              <BreadcrumbItem key={link.href}>
                <BreadcrumbLink asChild>
                  <Link href={link.href}>{link.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
          {currentLink && (
            <BreadcrumbItem key={currentLink.href}>
              <BreadcrumbPage>{currentLink.label}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
          
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}