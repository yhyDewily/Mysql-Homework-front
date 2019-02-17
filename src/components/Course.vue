<template>
    <div class="course">
        <v-toolbar color="cyan" dark tabs>
            <v-toolbar-title>选课系统</v-toolbar-title>
            <v-tabs
                    slot="extension"
                    v-model="tab"
                    centered
                    color="cyan"
                    slider-color="yellow"
            >
                <v-tab>
                    本学期课表
                </v-tab>
                <v-tab>
                    选课
                </v-tab>
                <v-tab>
                    下学期课表
                </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-data-table
                        :headers="semesterCourseHeaders"
                        :items="semesterCourses"
                        item-key="id">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.courseId }}</td>
                        <td>{{ props.item.courseName }}</td>
                        <td>{{ props.item.courseCredit }}</td>
                        <td>{{ props.item.teacherName }}</td>
                        <td>{{ props.item.dept }}</td>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-text-field
                        label="课程编号"
                        v-model="searchCourseInfo.courseId"
                        v-show="searchCourseInfo.status"></v-text-field>
                <v-text-field
                        label="课程名称"
                        v-model="searchCourseInfo.courseName"
                        v-show="searchCourseInfo.status"></v-text-field>
                <v-btn color="primary" @click="searchCourse()" v-show="searchCourseInfo.status">搜索</v-btn>
                <v-btn color="primary" @click="getUnchooseCourse()" v-show="searchCourseInfo.status">查看可选课程</v-btn>
                <v-data-table
                        :headers="courseHeaders"
                        :items="courses"
                        item-key="id"
                        v-show="searchCourseInfo.searched">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.courseId }}</td>
                        <td>{{ props.item.courseName }}</td>
                        <td>{{ props.item.credit }}</td>
                        <td>{{ props.item.teacherName }}</td>
                        <td>{{ props.item.dept }}</td>
                        <td>
                            <v-btn icon @click="addCourse(props.item.courseId)">
                                <v-icon color="success">done</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
                <v-data-table
                        :headers="nextSemesterCourseHeaders"
                        :items="nextSemesterCourses"
                        item-key="id"
                        v-show="searchCourseInfo.status">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.courseId }}</td>
                        <td>{{ props.item.courseName }}</td>
                        <td>{{ props.item.courseCredit }}</td>
                        <td>{{ props.item.teacherName }}</td>
                        <td>
                            <v-btn icon @click="delCourse(props.item.courseId)">
                                <v-icon color="error">clear</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs-items>
        <!--<v-btn v-on:click="getUnchooseCourse">get</v-btn>-->
    </div>
</template>

<script>
export default {
  name: 'Course',
  data: () => ({
    tab: null,
    sno: '',
    courses: [],
    courseHeaders: [
      {
        text: '课程编号',
        value: 'courseId'
      },
      {
        text: '课程名称',
        value: 'courseName'
      },
      {
        text: '学分',
        value: 'credit'
      },
      {
        text: '教师',
        value: 'teacherName'
      },
      {
        text: '开课系',
        value: 'dept'
      },
      {
        text: '选课',
        value: 'id',
        sortable: false
      }
    ],
    semesterCourses: [],
    semesterCourseHeaders: [
      {
        text: '课程编号',
        value: 'courseId'
      },
      {
        text: '课程名称',
        value: 'courseName'
      },
      {
        text: '学分',
        value: 'courseCredit'
      },
      {
        text: '教师',
        value: 'teacherName'
      },
      {
        text: '开课系',
        value: 'dept'
      }
    ],
    nextSemesterCourses: [],
    nextSemesterCourseHeaders: [
      {
        text: '课程编号',
        value: 'courseId'
      },
      {
        text: '课程名称',
        value: 'courseName'
      },
      {
        text: '学分',
        value: 'courseCredit'
      },
      {
        text: '教师',
        value: 'teacherName'
      },
      {
        text: '退课',
        value: 'id',
        sortable: false
      }
    ],
    searchCourseInfo: {
      status: true,
      searched: true,
      courseId: null,
      courseName: null
    }
  }),
  mounted: function () {
    this.getSno()
    this.getSemesterCourse()
    // this.getUnchooseCourse()
    this.getNextSemesterCourse()
  },
  methods: {
    getSno: function () {
      this.sno = this.$cookies.get('id')
    },
    // 获取本学期课表
    getSemesterCourse: function () {
      this.$axios.post('/course', {
        'sno': this.sno
      })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.semesterCourses.push({
              courseId: response.data[i].cno,
              courseName: response.data[i].cname,
              courseCredit: response.data[i].credit,
              teacherName: response.data[i].tname,
              dept: response.data[i].cdept
            })
          }
          console.log(response.data)
        })
        .catch(error => {
          window.alert(error)
        })
    },
    // 获取下学期课表
    getNextSemesterCourse: function () {
      this.$axios.post('/next/course', {
        'sno': this.sno
      })
        .then(response => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            this.nextSemesterCourses.push({
              courseId: response.data[i].cno,
              courseName: response.data[i].cname,
              courseCredit: response.data[i].credit,
              teacherName: response.data[i].tname
            })
          }
        })
    },
    // 获取未选课的课表
    getUnchooseCourse: function () {
      this.$axios.post('/course/unchoose', {
        'sno': this.sno
      })
        .then(response => {
          console.log(response.data)
          this.searchCourseInfo.searched = true
          this.courses = []
          for (let i = 0; i < response.data.length; i++) {
            this.courses.push({
              courseId: response.data[i].cno,
              courseName: response.data[i].cname,
              credit: response.data[i].credit,
              teacherName: response.data[i].tname,
              dept: response.data[i].cdept
            })
          }
        })
        .catch(error => {
          window.alert(error)
        })
    },
    // 查找课程
    searchCourse: function () {
      let Info = JSON.stringify({
        cno: this.searchCourseInfo.courseId,
        cname: this.searchCourseInfo.courseName
      })
      this.$axios.post('/course/search', Info)
        .then(response => {
          console.log(response.data)
          if (response.data !== '') { this.searchCourseInfo.searched = true }
          let searchCno = response.data.cno
          for (let i = 0; i < this.semesterCourses.length; i++) {
            if (searchCno === this.semesterCourses[i].courseId) {
              window.alert('该课程已选择')
              return
            }
          }
          this.courses = []
          this.courses.push({
            courseId: response.data.cno,
            courseName: response.data.cname,
            credit: response.data.credit,
            teacherName: response.data.tname
          })
        }).catch(error => {
          window.alert(error)
        })
    },
    // 添加课程
    addCourse: function (courseId) {
      for (let i = 0; i < this.nextSemesterCourses.length; i++) {
        if (courseId === this.nextSemesterCourses[i].courseId) {
          window.alert('该课程已选择')
          return
        }
      }
      let Info = JSON.stringify({
        sno: this.sno,
        cno: courseId
      })
      this.$axios.post('/course/add', Info)
        .then(response => {
          if (response.data.code === 200) {
            window.alert('选课成功')
            // this.nextSemesterCourses = []
            console.log(response.data)
            this.nextSemesterCourses.push({
              courseId: response.data['course'].cno,
              courseName: response.data['course'].cname,
              courseCredit: response.data['course'].credit,
              teacherName: response.data['course'].tname
            })
            let cno = response.data.cno
            for (let i = 0; i < this.courses.length; i++) {
              if (this.courses[i].courseId === cno) {
                this.courses.splice(i, 1)
              }
            }
          }
        }).catch(error => {
          window.alert(error)
        })
    },
    delCourse: function (courseId) {
      let Info = JSON.stringify({
        sno: this.sno,
        cno: courseId
      })
      this.$axios.post('/next/del', Info)
        .then(response => {
          if (response.data.code === 200) {
            window.alert(response.data.msg)
            let cno = response.data.cno
            for (let i = 0; i < this.nextSemesterCourses.length; i++) {
              if (this.nextSemesterCourses[i].courseId === cno) {
                this.nextSemesterCourses.splice(i, 1)
              }
            }
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
