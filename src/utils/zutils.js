import Axios from "axios"

export default {
    fetchClassList: async (callback) => {
        await Axios
            .get("/class/list")
            .then((response) => {
                callback(response.data.class)
            })
            .catch((err) => {
                console.error(err)
            })
    },

    fetchStudentList: async (classid, callback) => {
        await Axios
            .get("/class/stulist/" + classid)
            .then((response) => {
                let stus = response.data.student
                if (stus)
                    for (var i = 0; i < stus.length; i++) {
                        var inside = stus[i]["inside"];
                        var outside = stus[i]["outside"];
                        var large = stus[i]["large"];
                        var result = true;
                        if (outside < 20) {
                            this.inside = inside - (20 - outside) * 2;
                            outside = 20;
                        }
                        if (large < 16 || inside < 20 || outside < 20 || inside + outside < 44) {
                            result = false;
                        }
                        result ? stus[i].finished = "是" : stus[i].finished = "否"
                    }
                callback(stus)
            })
            .catch((err) => {
                console.error(err)
            })
    },
}