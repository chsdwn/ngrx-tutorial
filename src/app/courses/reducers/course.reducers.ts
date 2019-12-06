import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CourseActions from '../course.actions';

import { Course, compareCourses } from '../model/course';

// We use ngrx entity instead of this code block
// courses: Course[];
// Stores just courses id instead of all courses list
/* entities: { [key: number]: Course };
ids: number[]; */
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialState,
  // on(CourseActions.loadAllCourses),
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addAll(
      action.courses,
      {
        ...state,
        allCoursesLoaded: true
      }
    )
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export function reducer(state: CoursesState = initialState, action: Action) {
  return coursesReducer;
}
