import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationData {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

interface PaginationComponentProps {
  paginationData: PaginationData
  baseRoute: string
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  paginationData,
  baseRoute,
}) => {
  const {
    currentPage,
    lastPage,
    firstPage,
    firstPageUrl,
    lastPageUrl,
    nextPageUrl,
    previousPageUrl,
  } = paginationData

  if (lastPage <= 1) {
    return null
  }

  const getFullUrl = (partialUrl: string | null): string => {
    if (!partialUrl) return '#'
    return `${baseRoute}${partialUrl}`
  }

  const getPageUrl = (page: number): string => getFullUrl(`/?page=${page}`)

  const renderPageLinks = (): JSX.Element[] => {
    const pageLinks: JSX.Element[] = []
    const maxVisiblePages = 5

    let startPage = Math.max(firstPage, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(firstPage, endPage - maxVisiblePages + 1)
    }

    if (startPage > firstPage) {
      pageLinks.push(
        <PaginationItem key="first">
          <PaginationLink href={getFullUrl(firstPageUrl)}>{firstPage}</PaginationLink>
        </PaginationItem>
      )
      if (startPage > firstPage + 1) {
        pageLinks.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink href={getPageUrl(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < lastPage) {
      if (endPage < lastPage - 1) {
        pageLinks.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      pageLinks.push(
        <PaginationItem key="last">
          <PaginationLink href={getFullUrl(lastPageUrl)}>{lastPage}</PaginationLink>
        </PaginationItem>
      )
    }

    return pageLinks
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getFullUrl(previousPageUrl)} />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext href={getFullUrl(nextPageUrl)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
