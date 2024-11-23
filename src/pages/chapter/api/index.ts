const api = {
  getChapter: (bookId: string, chapterId: string) => `/api/v1/chapter/${bookId}/${chapterId}`,
  getBook: (id: string) => `/api/v1/book/${id}`,
};

export default api;
