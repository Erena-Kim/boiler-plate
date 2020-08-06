// 아까 다운로드 받은 express 모듈을 가져오기
const express = require("express");
// function을 이용해서 새로운 express app 만들기
const app = express();
// 어떤 포트를 해도 상관 없음 우리는 5000 포트를 백서버로 둘 것
const port = 5000;

// 지난번에 만들어뒀던 User model 가져오기
const { User } = require("./models/User");
// 바디 파서 받아오기
const bodyParser = require("body-parser");
// 바디 파서에 옵션 주기
// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는 코드
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

// 몽구스를 이용해 몽고 db와 application을 연결
const mongoose = require("mongoose");
// 비밀 설정 정보 가져오기
const config = require("./config/key");
mongoose
  .connect(
    config.mongoURI,
    // 에러 뜨지 않게 작성해주는 것
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// express 앱을 넣은 후에
// 루트 디렉토리에 오면("/") Hello world를 출력되게
app.get("/", (req, res) => res.send("Hello World 안녕하세요 김영현입니다."));

// 회원가입을 위한 router
// 이번에는 포스트 메서드 사용
app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다
  //request의 body 안에는 json 형식으로 정보가 들어있음
  // 이렇게 body에 들어있을 수 있는 것은 bodyParser가 있기 때문
  const user = new User(req.body);
  // 이거는 몽고db에서 사용하게 해주는 메서드 --> 정보들이 user 모델에 저장이 딘 것
  user.save((err, userinfo) => {
    // 콜백 함수를 이용해서 error가 발생하면 json 형식으로 success false와 error 메세지를,
    if (err) return res.json({ success: false, err });
    // error가 발생하지 않으면 (status 200은 성공) json 형식으로 success true를 전달
    return res.status(200).json({ success: true });
  });
});

// port 5000번에서 이 앱을 실행을 하는 것
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// 이 다음에 package.json으로 가서 scripts에 "start": "node index.js", 추가
// 이러면 npm run start하면 scripts에 있는 start를 실행, 즉 node 앱을 실행을 하는 것
// 그 때 실행할 때 시작점이 index.js
