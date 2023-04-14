--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-04-13 21:02:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3341 (class 1262 OID 16397)
-- Name: ChatApp; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "ChatApp" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Canada.1252';


ALTER DATABASE "ChatApp" OWNER TO postgres;

\connect "ChatApp"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16409)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message character varying(500),
    user_id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16408)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 216
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    last_active_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16398)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3181 (class 2604 OID 16412)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16402)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3335 (class 0 OID 16409)
-- Dependencies: 217
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, message, user_id, "timestamp") FROM stdin;
1	Hello everyone, how are you all doing?	1	2023-04-01 17:50:55.814958
3	Hey everyone, I'm excited to be a part of this forum!	9	2023-03-26 10:00:00
4	Same here! What do you all think about the new web app for suggesting songs?	14	2023-03-26 10:10:00
5	I think it's a great idea. We should make sure to have a feature that allows users to search for songs by genre.	13	2023-03-26 10:20:00
6	I agree with Helen. We should also have a way for users to see which songs are most popular.	5	2023-03-26 10:30:00
7	We should also allow band members to mark songs they've already played, so users can see what's been played recently.	4	2023-03-26 10:40:00
8	I agree with Olivia. It would also be great to have a discussion thread for each song suggestion.	17	2023-03-26 10:50:00
9	What about a feature that allows users to upvote or downvote song suggestions?	12	2023-03-26 11:00:00
10	I think that's a great idea, Grace. It would give users a way to voice their opinions.	2	2023-03-26 11:10:00
11	We should also have a feature that allows band members to rate song suggestions based on difficulty or style.	18	2023-03-26 11:20:00
12	That's a good point, Maggie. We should also have a way for users to see which band members like or dislike a particular song suggestion.	19	2023-03-26 11:30:00
13	Maybe we can also have a section for users to submit their own original songs!	4	2023-03-26 11:40:00
14	I like that idea, Olivia. It would be a great way for users to showcase their own talent.	13	2023-03-26 12:00:00
15	We should also have a way for users to follow their favorite band members and see what they've been up to.	9	2023-03-26 12:01:00
16	That's a great idea, David. We should also allow users to send messages to their favorite band members.	5	2023-03-26 12:02:00
17	What about a feature that allows users to create playlists of their favorite songs?	14	2023-03-26 12:03:00
18	I like that idea, Isaac. It would give users a way to save their favorite songs in one place.	17	2023-03-26 12:04:00
19	Hi Everyone!!!!!  What are we talking about here?	1	2023-03-26 14:49:20
20	Hello world!	1	2023-03-26 14:53:48
21	HI! I am Alice!!	1	2023-03-26 15:07:21
22	I am bob!!!!	1	2023-03-26 15:09:10
23	asdfasdf	22	2023-03-26 15:12:04
24	Hello world!	22	2023-03-26 15:17:54
25	This is now fun!!!	1	2023-03-26 15:18:08
26	It is now working!!!	1	2023-03-26 15:18:13
27	I am maggie!!  Here me roar!!!	18	2023-03-26 15:18:36
28	Oh stop it Maggie!!!  You are not a lion!!!	2	2023-03-26 15:19:01
29	God Help us all!!!!	1	2023-03-26 15:19:19
30	Hey everyone, I'm excited to be a part of this forum!	9	2023-03-26 10:00:00
31	Same here! What do you all think about the new web app for suggesting songs?	14	2023-03-26 10:10:00
32	I think it's a great idea. We should make sure to have a feature that allows users to search for songs by genre.	13	2023-03-26 10:20:00
33	I agree with Helen. We should also have a way for users to see which songs are most popular.	5	2023-03-26 10:30:00
34	We should also allow band members to mark songs they've already played, so users can see what's been played recently.	4	2023-03-26 10:40:00
35	I agree with Olivia. It would also be great to have a discussion thread for each song suggestion.	17	2023-03-26 10:50:00
36	What about a feature that allows users to upvote or downvote song suggestions?	12	2023-03-26 11:00:00
37	I think that's a great idea, Grace. It would give users a way to voice their opinions.	2	2023-03-26 11:10:00
38	We should also have a feature that allows band members to rate song suggestions based on difficulty or style.	18	2023-03-26 11:20:00
39	That's a good point, Maggie. We should also have a way for users to see which band members like or dislike a particular song suggestion.	19	2023-03-26 11:30:00
40	Maybe we can also have a section for users to submit their own original songs!	4	2023-03-26 11:40:00
41	I like that idea, Olivia. It would be a great way for users to showcase their own talent.	13	2023-03-26 12:00:00
42	We should also have a way for users to follow their favorite band members and see what they've been up to.	9	2023-03-26 12:01:00
43	That's a great idea, David. We should also allow users to send messages to their favorite band members.	5	2023-03-26 12:02:00
44	What about a feature that allows users to create playlists of their favorite songs?	14	2023-03-26 12:03:00
45	I like that idea, Isaac. It would give users a way to save their favorite songs in one place.	17	2023-03-26 12:04:00
46	Hi Everyone!!!!!  What are we talking about here?	1	2023-03-26 14:49:20
47	Hello world!	1	2023-03-26 14:53:48
48	HI! I am Alice!!	1	2023-03-26 15:07:21
49	I am bob!!!!	1	2023-03-26 15:09:10
50	asdfasdf	22	2023-03-26 15:12:04
51	Hello world!	22	2023-03-26 15:17:54
52	This is now fun!!!	1	2023-03-26 15:18:08
53	It is now working!!!	1	2023-03-26 15:18:13
54	I am maggie!!  Here me roar!!!	18	2023-03-26 15:18:36
55	Oh stop it Maggie!!!  You are not a lion!!!	2	2023-03-26 15:19:01
56	God Help us all!!!!	1	2023-03-26 15:19:19
58	Does anyone know what what time it is?	9	2023-04-03 09:03:11.263755
60	When would be the best time for us all to meet to discuss this further?	15	2023-04-03 20:45:29.384992
61	David, it's time to get a new couch!	8	2023-04-03 20:51:26.825266
62	Hi Everyone!  I'm Sarah, so happy to be part of this new group.	41	2023-04-03 20:54:55.446677
63	Welcome to our chat group Sarah!!!!	8	2023-04-03 20:56:23.993791
64	Where did Sarah go?	1	2023-04-05 17:01:10.883635
65	I was thinking this Saturday at 12:00.	15	2023-04-05 17:01:54.745496
66	Where did Sarah go?	1	2023-04-05 17:09:44.305832
67	Sarah went to the bathroom.	13	2023-04-07 11:38:41.723815
68	I'm back!!!	41	2023-04-07 12:55:25.960436
69	In black!!!!	1	2023-04-07 13:12:54.405973
70	"I've been too long, I'm glad to be back!!!"	41	2023-04-07 13:25:56.338489
71	"Yes, I'm let loose, from the noose, that's kept me hanging about."	41	2023-04-07 13:27:58.297304
72	"I've been looking at the sky, 'Cause it's getting me high, forget the the hearse cause I never die"	41	2023-04-07 13:38:45.138735
75	"I got nine lives, Cat's eyes, Abusin' everyone of them and running wild"	13	2023-04-07 14:00:02.448593
76	"Cause I am back!  Yes, I'm back, Well, I'm back, Yes, I'm back in black"	13	2023-04-07 14:06:12.437085
78	All Right you two!!  Enough with AC/DC!!!	14	2023-04-07 14:07:36.998202
79	And yes, I am jealous that you guys are going to the concert next week.	14	2023-04-07 14:08:06.46177
80	Where do I get tickets for the concert?	40	2023-04-08 13:53:15.130279
81	Sorry tickets are all sold out!	22	2023-04-08 13:57:28.620259
82	Rats!  Are there any other concerts worth going to?	4	2023-04-08 14:03:52.975636
83	Check the concert listings.  What bands do you like?	1	2023-04-08 16:30:02.288355
\.


--
-- TOC entry 3333 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, date_created, last_active_at) FROM stdin;
16	Karen	efg123	2023-04-02 10:24:46.721021	2023-04-06 19:05:08.901264
10	Eva	mno345	2023-04-02 10:24:46.721021	2023-04-09 17:43:08.738475
2	Alice	abc123	2023-04-01 16:17:35.650729	2023-04-02 14:17:35.650729
43	John Smith	hello	2023-04-09 19:20:54.876187	2023-04-09 18:22:04.236537
44	Tommy Jones	hello	2023-04-09 19:26:14.127394	2023-04-09 18:26:21.553932
5	Bob	def456	2023-04-01 16:24:30.105536	2023-04-10 20:51:54.831676
1	Asher	food	2023-04-01 14:05:07.115998	2023-04-11 05:29:36.439216
15	Jack	bcd890	2023-04-02 10:24:46.721021	2023-04-11 05:30:45.739519
13	Helen	vwx234	2023-04-02 10:24:46.721021	2023-04-11 05:31:20.429768
41	Sarah	love	2023-04-03 20:54:22.350828	2023-04-11 05:31:57.348584
14	Isaac	yza567	2023-04-02 10:24:46.721021	2023-04-11 05:33:01.08607
22	Samantha	anger	2023-04-02 10:24:46.721021	2023-04-11 05:34:21.402829
19	Nate	nop012	2023-04-02 10:24:46.721021	2023-04-11 05:35:10.21132
11	Frank	pqr678	2023-04-02 10:24:46.721021	2023-04-11 05:36:03.674994
8	Charlie	ghi789	2023-04-02 10:24:46.721021	2023-04-03 20:55:55.843257
40	Sam	pol731	2023-04-02 18:48:19.124575	2023-04-11 06:50:59.721253
18	Maggie	klm789	2023-04-02 10:24:46.721021	2023-04-11 06:52:06.192233
12	Grace	stu901	2023-04-02 10:24:46.721021	2023-04-06 18:35:00.733222
17	Larry	hij456	2023-04-02 10:24:46.721021	2023-04-06 18:37:35.672272
9	David	jkl012	2023-04-02 10:24:46.721021	2023-04-06 18:38:41.639997
4	Olivia	qrs345	2023-04-01 16:23:51.380067	2023-04-08 14:03:52.975636
\.


--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 216
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 83, true);


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 44, true);


--
-- TOC entry 3188 (class 2606 OID 16417)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3184 (class 2606 OID 16405)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16407)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3189 (class 2606 OID 16418)
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2023-04-13 21:02:45

--
-- PostgreSQL database dump complete
--

