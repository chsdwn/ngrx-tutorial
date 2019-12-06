import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction('[Course Component] Load All Courses');
export const allCoursesLoaded = createAction('[Course Component] All Courses Loaded', props<{courses: Course[]}>());
export const courseUpdated = createAction('[Course Component] Course Updated', props<{update: Update<Course>}>());
