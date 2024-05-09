import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: user, error } = await supabase.auth.getUser();
  // console.log(user);

  if (error) throw new Error(error.message);

  return user?.user;
}

export async function updateUser({ fullName, password, avatar }) {
  // if we got only fullName or password
  // 1. update what's gonna get updated
  let updatedField;
  if (password) updatedField = { password };
  if (fullName) updatedField = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedField);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // all of the next only if there's avatar (if I updated the password there will be no avatar anyway)
  // 2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: error2 } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (error2) throw new Error(error2.message);

  // 3. assign avatar to user
  const { data: newUser, error: error3 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error3) throw new Error(error3.message);

  return newUser;
}
