import Http from './Http';

const addFolderService = async (payload) => {
  const response = await Http.post('/folder/add/', payload);
  return response.data;
};

const getUserFoldersService = async () => {
  const response = await Http.get('/folder/by_user/');
  return response.data;
};

export { addFolderService, getUserFoldersService };
