export type IBookFilterRequest = {
  search?: string | undefined;
  categoryId?: string | undefined;
  price?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  title?: string | undefined;
  author?: string | undefined;
  genre?: string | undefined;
  category?: string | undefined;
};

export type IStudentMyCoursesRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};

export type IStudentMyCourseSchedulesRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};
