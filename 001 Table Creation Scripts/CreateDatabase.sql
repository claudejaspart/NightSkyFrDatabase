-- Database: HALO

-- DROP DATABASE "NIGHTSKYFR";

CREATE DATABASE "NIGHTSKYFR"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "NIGHTSKYFR"
    IS 'Home Astrophysics Observatory';