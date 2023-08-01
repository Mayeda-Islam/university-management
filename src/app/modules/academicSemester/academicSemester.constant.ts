import {
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
  IAcademicSemesterCode,
} from './academicSemester.interface';
export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];
export const academicSemesterTitleCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterFilterableFields = ['searchTerm', 'title'];
export const academicSemesterSearchableFields = ['title'];
