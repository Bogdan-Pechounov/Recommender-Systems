import { useMemo } from 'react'

//array with values from start to end
function range(start, end) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => i + start)
}

function usePagination({ page, pageSize, siblingCount = 1, numItems }) {
  const paginationRange = useMemo(() => {
    const numPages = Math.ceil(numItems / pageSize)

    const leftIndex = Math.max(page - siblingCount, 1)
    const rightIndex = Math.min(page + siblingCount, numPages)

    const showLeftDots = leftIndex > 2
    const showRightDots = rightIndex < numPages - 2

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount)
      return [...leftRange, '...', numPages]
    } else if (showLeftDots && !showRightDots) {
      const rightRange = range(numPages - (3 + 2 * siblingCount) + 1, numPages)
      return [1, '...', ...rightRange]
    } else if (showLeftDots && showRightDots) {
      const middleRange = range(leftIndex, rightIndex)
      return [1, '...', ...middleRange, '...', numPages]
    } else {
      return range(1, numPages)
    }
  }, [page, pageSize, siblingCount, numItems])

  return paginationRange
}

export default usePagination
