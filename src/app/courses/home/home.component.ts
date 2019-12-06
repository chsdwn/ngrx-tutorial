import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../reducers';
import * as CourseActions from '../course.actions';
import { CoursesHttpService } from '../services/courses-http.service';

import { compareCourses, Course } from '../model/course';
import { selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from '../courses.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(
      select(selectBeginnerCourses)
    );
    this.advancedCourses$ = this.store.pipe(
      select(selectAdvancedCourses)
    );
    this.promoTotal$ = this.store.pipe(
      select(selectPromoTotal)
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };
    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
