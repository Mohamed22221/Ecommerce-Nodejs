const handelPagination = (query , total) => {
  //handel pagination

  const limit = parseInt(query.limit) || 6;
  const page = parseInt(query.page) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  //pagination results
  const results = {};
  if (endIndex < total) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  return {
    limit,
    startIndex,
    results,
  };
};

export default handelPagination
