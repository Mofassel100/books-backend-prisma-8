export type IBookFilterRequest = {
  search?: string | undefined;
  category?: string;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
};

export type IStudentMyCoursesRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};

export type IStudentMyCourseSchedulesRequest = {
  academicSemesterId?: string | undefined;
  courseId?: string | undefined;
};
