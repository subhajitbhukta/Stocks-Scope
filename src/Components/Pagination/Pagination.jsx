const Pagination = ({ totalPost, postPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i)
  }
  return (
    <>
    <div>
      {
        pages.map((page, index) => {
          return <button onClick={() => {
            setCurrentPage(page)
          }} className='mx-1 px-3 py-1 border text-white border-green-400 rounded' key={index}>{page}</button>
        })
      }
    </div>
    </>
  )
}

export default Pagination
