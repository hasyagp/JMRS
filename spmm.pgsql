PGDMP     
    .                y            spmm    13.3    13.3 1    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16833    spmm    DATABASE     h   CREATE DATABASE spmm WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE spmm;
                postgres    false                        3079    16937 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    17020    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    task_id integer,
    user_id integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    text text
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    17018    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    212            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    211            �            1259    16913    task    TABLE     m  CREATE TABLE public.task (
    task_id integer NOT NULL,
    task_tittle character varying(255),
    description text,
    due_date timestamp with time zone,
    file character varying(255),
    completed boolean,
    user_id integer,
    "completedAt" timestamp with time zone,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.task;
       public         heap    postgres    false            �            1259    16873 	   task_list    TABLE     �   CREATE TABLE public.task_list (
    task_list_id integer NOT NULL,
    task_id integer NOT NULL,
    user_id integer NOT NULL,
    status character varying(255)[]
);
    DROP TABLE public.task_list;
       public         heap    postgres    false            �            1259    16869    task_list_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_list_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.task_list_task_id_seq;
       public          postgres    false    204            �           0    0    task_list_task_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.task_list_task_id_seq OWNED BY public.task_list.task_id;
          public          postgres    false    202            �            1259    16867    task_list_task_list_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_list_task_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.task_list_task_list_id_seq;
       public          postgres    false    204            �           0    0    task_list_task_list_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.task_list_task_list_id_seq OWNED BY public.task_list.task_list_id;
          public          postgres    false    201            �            1259    16871    task_list_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_list_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.task_list_user_id_seq;
       public          postgres    false    204            �           0    0    task_list_user_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.task_list_user_id_seq OWNED BY public.task_list.user_id;
          public          postgres    false    203            �            1259    16911    task_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.task_task_id_seq;
       public          postgres    false    206            �           0    0    task_task_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.task_task_id_seq OWNED BY public.task.task_id;
          public          postgres    false    205            �            1259    16977    tasks    TABLE     �  CREATE TABLE public.tasks (
    id integer NOT NULL,
    task_tittle character varying(255),
    due_date timestamp with time zone,
    description text,
    file character varying(255),
    completed boolean DEFAULT false,
    "completedAt" timestamp with time zone,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    assignee_id character varying
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    16975    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    208            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    207            �            1259    16998    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    user_name character varying,
    user_email character varying,
    user_password character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16996    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            U           2604    17023    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            Q           2604    16916    task task_id    DEFAULT     l   ALTER TABLE ONLY public.task ALTER COLUMN task_id SET DEFAULT nextval('public.task_task_id_seq'::regclass);
 ;   ALTER TABLE public.task ALTER COLUMN task_id DROP DEFAULT;
       public          postgres    false    206    205    206            N           2604    16876    task_list task_list_id    DEFAULT     �   ALTER TABLE ONLY public.task_list ALTER COLUMN task_list_id SET DEFAULT nextval('public.task_list_task_list_id_seq'::regclass);
 E   ALTER TABLE public.task_list ALTER COLUMN task_list_id DROP DEFAULT;
       public          postgres    false    204    201    204            O           2604    16877    task_list task_id    DEFAULT     v   ALTER TABLE ONLY public.task_list ALTER COLUMN task_id SET DEFAULT nextval('public.task_list_task_id_seq'::regclass);
 @   ALTER TABLE public.task_list ALTER COLUMN task_id DROP DEFAULT;
       public          postgres    false    202    204    204            P           2604    16878    task_list user_id    DEFAULT     v   ALTER TABLE ONLY public.task_list ALTER COLUMN user_id SET DEFAULT nextval('public.task_list_user_id_seq'::regclass);
 @   ALTER TABLE public.task_list ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    203    204    204            R           2604    16980    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    208    208            T           2604    17001    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �          0    17020    comments 
   TABLE DATA           X   COPY public.comments (id, task_id, user_id, "createdAt", "updatedAt", text) FROM stdin;
    public          postgres    false    212   v5       �          0    16913    task 
   TABLE DATA           �   COPY public.task (task_id, task_tittle, description, due_date, file, completed, user_id, "completedAt", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    206   �5       �          0    16873 	   task_list 
   TABLE DATA           K   COPY public.task_list (task_list_id, task_id, user_id, status) FROM stdin;
    public          postgres    false    204   �6       �          0    16977    tasks 
   TABLE DATA           �   COPY public.tasks (id, task_tittle, due_date, description, file, completed, "completedAt", "createdAt", "updatedAt", assignee_id) FROM stdin;
    public          postgres    false    208   �6       �          0    16998    users 
   TABLE DATA           I   COPY public.users (id, user_name, user_email, user_password) FROM stdin;
    public          postgres    false    210   i8       �           0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 1, true);
          public          postgres    false    211            �           0    0    task_list_task_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.task_list_task_id_seq', 1, false);
          public          postgres    false    202            �           0    0    task_list_task_list_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.task_list_task_list_id_seq', 1, false);
          public          postgres    false    201            �           0    0    task_list_user_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.task_list_user_id_seq', 1, false);
          public          postgres    false    203                        0    0    task_task_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.task_task_id_seq', 15, true);
          public          postgres    false    205                       0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 19, true);
          public          postgres    false    207                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    209            _           2606    17025    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    212            W           2606    16883    task_list task_list_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.task_list
    ADD CONSTRAINT task_list_pkey PRIMARY KEY (task_list_id);
 B   ALTER TABLE ONLY public.task_list DROP CONSTRAINT task_list_pkey;
       public            postgres    false    204            Y           2606    16921    task task_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);
 8   ALTER TABLE ONLY public.task DROP CONSTRAINT task_pkey;
       public            postgres    false    206            [           2606    16986    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    208            ]           2606    17006    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �   V   x�3�4B##C]s]##+s+3=3K#ms|R�E9�
)�@:)13;S!%1'1W� 5�4'�81O!/_���(��+F��� �xY      �   �   x������0���)�.�$ڭ���A|�\�vj�5�d�ǷZ�.z[�\�0��H����MG�c%���r.T�*V�3Q'O�h"^��S�'Л�˖�Xg܎��H�����@%�B���J��ț�j��ޛP�����{y)a\ 4�����tw_-Q�����;���_���ډ�7��+����T5��'Æ۪��-���͓��Y~��7��,���1�9      �      x������ � �      �   s  x���Kn�0E��*�WX~�
��JiE+����P�XNUUDL�u��h���9�?�k��+M�p$T���v5�ݴXwq�W�9weH\���;o��?�uU3�HNY��	37�����$C���\h#�<�л\�!���*�i�mAi�������4"I����ܝw�߲|jH�<+C�嫇	.���2\~1r$�p�|q��y��/�<�h@�)���խ&hAWF�lBD�&����*�Z�=��ܕ�$���~ya�m\�#����!CR�o��IT����Ru���bv�#Jՙ%����R�dvI�rr��\6AI�*2Zi���V��ސ9J2�~I�AY(�F�t�~�Ǌ�G#'��AˍS"­j���cM      �   \   x�3�,-������9z����*F�*�*��Aa���aN��z�e�&z��EU�A�~Ya�9��y�~ᙆF��UA)�%�e&f�\1z\\\ ���     