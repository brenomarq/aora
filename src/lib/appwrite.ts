import { VideoForm } from "@/app/(tabs)/create";
import { DocumentPickerAsset } from "expo-document-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { config } from "./config";

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error("Could not create an account!");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
    account.deleteSessions();

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Something went wrong :(");
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function getAllPosts() {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return post.documents;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function getLatestPosts() {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return post.documents;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function searchPosts(query: string) {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return post.documents;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function getUserPosts(userId: string) {
  try {
    const post = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("users", userId)]
    );

    return post.documents;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (err: unknown) {
    if (err instanceof Error) throw Error(err.message);
  }
}

export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top" as any,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
  }
}

export async function uploadFile(file: DocumentPickerAsset, type: string) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset as any
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
  }
}

export async function createVideo(form: VideoForm) {
  try {
    const [thumbnailURL, videoURL] = await Promise.all([
      uploadFile(form.thumbnail as DocumentPickerAsset, "image"),
      uploadFile(form.video as DocumentPickerAsset, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailURL,
        video: videoURL,
        prompt: form.prompt,
        users: form.userId,
      }
    );

    return newPost;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
  }
}
