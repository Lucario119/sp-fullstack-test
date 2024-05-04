import { app, port } from './src/server';

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});