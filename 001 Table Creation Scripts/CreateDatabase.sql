-- Database: HALO

-- DROP DATABASE "HALO";

CREATE DATABASE "HALO"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "HALO"
    IS 'Home Astrophysics Low Observatory';