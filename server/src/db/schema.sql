CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255),
  picture TEXT
);


CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  raw_parsed_data JSONB NOT NULL,

  is_primary BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resumes_user ON resumes(user_id);


CREATE TABLE resume_basic_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),

    linkedin VARCHAR(255),
    github VARCHAR(255),
    website VARCHAR(255),
    address TEXT
);


CREATE TABLE resume_experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    role VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    duration VARCHAR(100),
    description TEXT
);

CREATE TABLE resume_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,
    description TEXT,
    technologies TEXT[],
    duration VARCHAR(100),
    link VARCHAR(255)
);

CREATE TABLE resume_education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    degree VARCHAR(150),
    major VARCHAR(150),
    institution VARCHAR(150),
    location VARCHAR(150),
    start_year INT,
    end_year INT,
    minor VARCHAR(150),
    gpa VARCHAR(20)
);


CREATE TABLE resume_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,

    name VARCHAR(150),
    issuer VARCHAR(150),
    date VARCHAR(50),
    relevance TEXT
);


CREATE TABLE resume_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    skill VARCHAR(100) NOT NULL
);

CREATE INDEX idx_resume_skills_skill ON resume_skills(skill);


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';