const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    //space를 없애주는 역할
    trim: true,
    //똑같은 이메일이 없도록
    unique: 1,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // role을 주는 이유는 관리자와 일반 유저를 구분하기 위해
  role: {
    // Number가 1이면 관리자, 0이면 일반 유저 이런식
    type: Number,
    // role을 지정하지 않았을 때 디폴트 값
    default: 1,
  },
  // object를 사용하지 않을 수도 있음
  image: String,
  //token으로 유효성 관리
  token: {
    type: String,
  },
  //   토큰이 사용할 수 있는 유효 기간
  tokenExp: {
    type: Number,
  },
});

// 스키마를 모델로 감싸주기
// 첫번째 이름은 만들 모델의 이름, 두번째 인자는 스키마
const User = mongoose.model("User", userSchema);

// 다른 파일에서도 사용가능하도록 export
module.exports = { User };
