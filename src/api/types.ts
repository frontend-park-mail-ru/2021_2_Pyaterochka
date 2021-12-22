type IdType = string | number;

type CreatorEntity = {
    id: IdType,
    name: string,
    avatar: string,
    cover: string,
    description: string,
    levelId: IdType
};

interface InData {
    [key: string]: string;
}

type PostEntity = {
    id: IdType,
    creatorId: IdType,
    levelId: IdType,
    title: string,
    published: Date,
    views: string,
    likes: number,
    description: string,
    image: string,
};

type AttachmentEntity = {
    id?: IdType
    type: string
    value: string
};

type ProfileEntity = {
    email: string,
    username: string,
    id: IdType,
    avatar: string,
    haveCreator: boolean,
}

type LevelEntity = {
    id: IdType
    name: string
    cover: string
    benefits: string[]
    price: string,
    priceNumber: number,
    color: string
    parentId: IdType
}

type FullPostEntity = PostEntity & {
    liked?: boolean,
    body?: AttachmentEntity[]
};

type PaymentEntity = {
    id: IdType,
    amount: string,
    creatorId: IdType,
    creator: {
        id: IdType,
        nickname: string,
        category: string,
        description: string
    },
    date: Date,
    userId: IdType
}

type LevelWithParentEntity = LevelEntity & {
    parent?: LevelEntity,
    parentName?: string
};

type LoginInData = {
    email: string,
    password: string
};

type ChangePasswordInData = {
    oldPassword: string,
    newPassword: string
};

type CommentEntity = {
    id: IdType
    user: {
        username: string,
        avatar: string,
        id: IdType,
        isCreator: boolean
    },
    body: string,
    published: Date
}

export {
    IdType,
    CreatorEntity,
    InData,
    PostEntity,
    AttachmentEntity,
    ProfileEntity,
    LevelEntity,
    LevelWithParentEntity,
    PaymentEntity,
    FullPostEntity,
    LoginInData,
    ChangePasswordInData,
    CommentEntity
};
