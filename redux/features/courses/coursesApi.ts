import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAlCourses: builder.query({
      query: () => ({
        url: "get-courses-for-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete-course/${id}`,
        method: "",
        credentials: "include" as const,
      }),
    }),

    getAllUserCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addnewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),

    addnewAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),

    addnewReview: builder.mutation({
      query: ({ review , rating, courseId}) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: {review , rating },
        credentials: "include" as const,
      }),
    }),

    addReviewReply: builder.mutation({
      query: ({  comment, courseId, reviewId}) => ({
        url: `add-reply-review`,
        method: "PUT",
        body: { comment, courseId, reviewId},
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAlCoursesQuery,
  useDeleteCourseMutation,
  useGetAllUserCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddnewQuestionMutation,
  useAddnewAnswerMutation,
  useAddnewReviewMutation,
  useAddReviewReplyMutation
} = courseApi;
