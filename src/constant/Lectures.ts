export const publishers: ReadonlyArray<PublishersObject> = [
  {
    label: "康軒",
    grades: [
      {
        label: "1上",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "1下",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "2上",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "2下",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "3上",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "3下",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "4上",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "4下",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "5上",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "5下",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "6上",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "6下",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - Second Semester Lecture",
          },
        ],
      },
    ],
  },
  {
    label: "南一",
    grades: [
      {
        label: "1上",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "1下",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "2上",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "2下",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "3上",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "3下",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "4上",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "4下",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "5上",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "5下",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "6上",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "6下",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - Second Semester Lecture",
          },
        ],
      },
    ],
  },
  {
    label: "翰林",
    grades: [
      {
        label: "1上",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "1下",
        lectures: [
          {
            lectureId: 1,
            title: "1st Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "2上",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "2下",
        lectures: [
          {
            lectureId: 1,
            title: "2nd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "3上",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "3下",
        lectures: [
          {
            lectureId: 1,
            title: "3rd Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "4上",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "4下",
        lectures: [
          {
            lectureId: 1,
            title: "4th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "5上",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "5下",
        lectures: [
          {
            lectureId: 1,
            title: "5th Grade - Second Semester Lecture",
          },
        ],
      },
      {
        label: "6上",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - First Semester Lecture",
          },
        ],
      },
      {
        label: "6下",
        lectures: [
          {
            lectureId: 1,
            title: "6th Grade - Second Semester Lecture",
          },
        ],
      },
    ],
  },
];

export interface PublishersObject {
  label: string;
  grades: Grade[];
}

interface Grade {
  label: string;
  lectures: Lecture[];
}

interface Lecture {
  lectureId: number;
  title: string;
}
