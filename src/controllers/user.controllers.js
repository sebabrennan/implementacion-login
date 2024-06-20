import * as service from "../services/user.services.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(email, password);
    if (!user) res.status(401).json({ msg: "No estas autorizado" });
    //res.redirect('/error-login)
    else {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/views/profile");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const user = await userDao.register({
        ...req.body,
        role: "admin",
      });
      if (!user) res.status(401).json({ msg: "user exist!" });
      else res.redirect("/login");
    }
    const user = await userDao.register(req.body);
    if (!user) res.status(401).json({ msg: "user exist!" });
    else res.redirect("/login");
  } catch (error) {
    throw new Error(error);
  }
};

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send("session destroy");
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getByIdUser(id);
    if (!item) throw new Error("User not found!");

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const item = await service.getByEmailUser(email);
    if (!item) throw new Error("User not found!");
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllUsers(page, limit);
    res.json(response);
    // const next = response.hasNextPage ? `http://localhost:8080/users/all?page=${response.nextPage}` : null;
    // const prev = response.hasPrevPage ? `http://localhost:8080/users/all?page=${response.prevPage}` : null;
    // res.json({
    //   payload: response.docs,
    //   info: {
    //     count: response.totalDocs,
    //     pages: response.totalPages,
    //     next,
    //     prev
    //   }
    // })
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const user = { ...req.body };
    const newUser = await service.createUser(user);
    if (!newUser) throw new Error("Validation Error!");
    else
      res.json({
        data: newUser,
      });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    let item = await getByIdUser(id);

    if (!item) throw new Error("User not found!");

    const userUpdated = await service.updateUser(id, {
      name,
      description,
      price,
      stock,
    });

    res.json({
      msg: "User updated",
      data: userUpdated,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.deleteUser(id);

    res.json({
      msg: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};
