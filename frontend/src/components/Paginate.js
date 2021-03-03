import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  isProject = false,
  keyword = ""
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {//remember ...Array(pages) gives an array of undefined elements, then using .keys() retruns an array with the index of each element - something like [0,1,2] if you have 3 pages
        // the prop isAdmin is passed to this component as "true" in the ProductListScreen
        [...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              !isProject
                ? !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
                : `/admin/projectlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
