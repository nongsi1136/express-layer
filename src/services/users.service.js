import UserRepository from "../repositories/users.repository.js";

const userRepository = new UserRepository();

export default class UserService {
  signup = async (email, password, confirmPassword, name) => {
    // signup 컨트롤러의 비즈니스 로직

    // 필수 파라미터 검증하기
    if (!email || !password || !confirmPassword || !name) {
      throw new Error("모든 필수 정보를 입력해야 합니다.");
    }

    // 이메일 형식 검증하기
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("유효한 이메일 주소를 입력해야 합니다.");
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 이메일 중복 확인
    const alreadyUser = await userRepository.getUserByEmail(email);

    // user가 존재하면 email이 중복되는 것이기 때문에 error 발생
    if (alreadyUser) {
      throw new Error("존재하는 email입니다.");
    }

    const user = await userRepository.createUser(
      email,
      password,
      name,
      profileImage
    );

    return user;
  };

  signin = async (email, password) => {
    // signin 컨트롤러의 비즈니스 로직

    if (!email) {
      throw new Error("email은 필수 입력값입니다.");
    }
    if (!password) {
      throw new Error("password는 필수 입력값입니다.");
    }

    // 해당하는 이메일이 존재하는지 찾기
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("가입되지 않은 이메일입니다.");
    }

    if (user.password !== password) {
      throw new Error("비밀번호가 올바르지 않습니다.");
    }

    // password가 맞으면 로그인이 완료된 것이므로 access token을 생성하여 반환
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );

    return accessToken;
  };

  getProfile = async (userId) => {
    // getProfile 컨트롤러의 비즈니스 로직

    const userProfile = await this.userRepository.getProfile(userId);
    return userProfile;
  };
}
