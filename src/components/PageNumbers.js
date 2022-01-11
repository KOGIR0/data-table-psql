function PageNumbers(props) {
  return (
    <div class="row">
      {[...Array(props.pageCount).keys()].map((pageNum) => {
        return (
          <div
            key={pageNum}
            onClick={() => props.onPageNumClick(pageNum)}
            style={{
              backgroundColor:
                props.currentPage === pageNum + 1 ? "orange" : "yellow",
            }}
            class="page-number"
          >
            {pageNum + 1}
          </div>
        );
      })}
    </div>
  );
}

export default PageNumbers;
