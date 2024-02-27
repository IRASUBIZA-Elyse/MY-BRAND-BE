interface JwtSession {
  session: boolean;
}

interface JwtConfig {
  jwtSecret: string;
  jwtSession: JwtSession;
}

const config: JwtConfig = {
  jwtSecret: "JWT Secret",
  jwtSession: { session: false },
};

export default config;
