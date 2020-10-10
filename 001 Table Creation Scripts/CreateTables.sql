
-- Tables principales

create Table StarObjects
(
	id						SERIAL PRIMARY KEY,
	hipId					varchar(255),
	harvardId				varchar(255),
	harvardRevisedId 		varchar(255),
	glieseId 				varchar(255),
	bayerFlamsteedId	   	varchar(255),
	rightAscension			varchar(50),
	declination				varchar(50),
	properName 				varchar(255),	
	objectTypeId 			integer,						
	distancePC 				numeric(48,24),
	radialVelocity 			numeric(48,24),
	visualMagnitude 		numeric(10,8),
	absoluteMagnitude 		numeric(10,8),
	spectralType 			varchar(255),
	ColorIndex 				numeric(48,24),
	constellationAbbr 		varchar(255),
	luminosity 				numeric(48,24),
	variableStarLabel		varchar(255),
	variableMinMag 		 	numeric(10,8),
	variableMaxMag 			numeric(10,8),
	Constellation_id 		integer,
	ObjectType_id 			integer
);

create Table MessierObjects
(
	id						SERIAL PRIMARY KEY,
	name					varchar(5),
	ngc						varchar(10),
	objectType 			 	varchar(50),
	season 			 		varchar(50),
	constellation 			varchar(255),
	constellationAbbr	   	varchar(5),
	magnitude 				varchar(10),
	rightAscension			varchar(50),
	declination				varchar(50),
	distanceLY 				varchar(50),	
	apparentSizeArcSec 		varchar(50),						
	discoverer 				varchar(50),
	discoveryYear 			varchar(5),
	description 			text
);



create Table Constellations
(
	id 						SERIAL PRIMARY KEY,
	properEngName 			varchar(255),
	properFrName 			varchar(255),
	latinName 				varchar(255),
	abbreviation			varchar(10)
);



create Table Images
(
	id 						SERIAL PRIMARY KEY,
	filename				text,
	path					varchar(1024),
	title					varchar(255),
	description				text,
	author 					varchar(255),
	timestamp				TIMESTAMP WITH TIME ZONE,			
	ImageType_id			integer
);


create Table Sessions
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255),
	description 			text,
	Sites_id				integer,
	SkyQuality_id 			integer
);

create Table SkyQuality
(
	id 						SERIAL PRIMARY KEY,
	mpsa 					numeric(10,5),
	seeingId 				integer,
	faintestStarMag 		numeric(10,5),
	Seeing_Id 				integer
);


create Table Sites
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255),
	description 			text,
	gpsCoords 				text,
	address					varchar(255),
	city 					varchar(255),
	postalCode 				varchar(10)
);


create Table Observation
(
	id 						SERIAL PRIMARY KEY,
	skyObjectId 			integer,
	startDate 				TIMESTAMP WITH TIME ZONE,	
	endDate 				TIMESTAMP WITH TIME ZONE,
	observerId				integer,		
	siteId					integer,		
	SkyQualityId			integer,			
	sessionId 				integer	
);

create Table ObservationList
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255),
	description 			text	
);


create Table EquipmentType
(
	id 						SERIAL PRIMARY KEY,
	type 					varchar(255),
	iconId					integer
);


create Table Seeing
(
	id 						SERIAL PRIMARY KEY,
	description				varchar(255),
	level 					integer
);

create Table Users
(
	id 						SERIAL PRIMARY KEY,
	firstName	 			varchar(255),
	login	 				varchar(255),
	passwd					varchar(255)					
);

create Table Icons
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255),
	url						varchar(1024)
);

create Table Telescopes
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255) UNIQUE,
	aperture				integer,
	focal					integer,
	fdratio					numeric,
	manufacturer 			varchar(255),
	description 			varchar(1024),
	Equipment_id 			integer
);

create Table Eyepieces
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255) UNIQUE,
	focal					integer,
	afov					numeric,
	manufacturer 			varchar(255),
	description 			varchar(1024),
	Equipment_id 			integer
);

create Table Binoculars
(
	id 						SERIAL PRIMARY KEY,
	name 					varchar(255) UNIQUE,
	aperture				integer,
	magnification 			integer,
	afov 				numeric,
	manufacturer 			varchar(255),
	description 			varchar(1024),
	Equipment_id 			integer
);

-- table de liaisons

create Table ObservationList_has_SkyObjects
(
	ObservationList_id 		integer,
	SkyObject_id 			integer
);

create Table Constellation_has_Images
(
	Constellation_id 		integer,
	Image_id 				integer
);

create Table SkyObject_has_Images
(
	SkyObject_id 			integer,
	Image_id 				integer
);

create Table MessierObject_has_Images
(
	MessierObject_id 		integer,
	Image_id 				integer
);

create Table SkyObject_has_Observations
(
	SkyObject_id 			integer,
	Observation_id 			integer
);

create Table Observation_has_Equipment
(
	Observation_id 			integer,
	Equipment_id 			integer
);

create Table Telescope_has_Images
(
	Telescope_id 			integer,
	Image_id 			integer
);

create Table Eyepiece_has_Images
(
	Eyepiece_id 			integer,
	Image_id 			integer
);

create Table Binoculars_has_Images
(
	Binoculars_id 			integer,
	Image_id 			integer
);


-- Tables des types

create Table ImageType
(
	id 						SERIAL PRIMARY KEY,
	name					varchar(255),
	iconId					integer
);


create Table ObjectType
(
	id 						SERIAL PRIMARY KEY,
	name					varchar(255),
	iconId					integer
);




