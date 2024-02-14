import Blog from "../models/Blogs";
import { Request, Response } from "express";
import { Error } from "mongoose";

// export const createBlog = async (req: Request, res: Response) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json(blog);
// } catch (err: any) {
//     res.status(400).json({ message: err.message });
// }
// };

export const getBlog = async (req: Request, res: Response) => {
  try {
    const Blogschema = await Blog.find();
    res.send(Blogschema);
  } catch (error) {
    res.status(500).send({ error: Error.messages });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).send({ error: Error.messages });
  }
};
// export const createBlog = async (req: Request, res: Response) => {
//   try {
//     const blog = new Blog({
//       title: req.body.title,
//       content: req.body.content,
//     });
//     await Blog.save();
//     res.send(Blog);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

export const getByBlobById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(Blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};
// export const getBlogById = async (req: Request, res: Response) => {
//   try {
//       const blog = await Blog.findById(req.params.id);
//       if (!blog) {
//           return res.status(404).json({ message: 'Blog not found' });
//       }
//       res.json(blog);
//   } catch (err: any) {
//       res.status(500).json({ message: (err as Error).message });
//   }
// };

// Update a specific Blog by ID
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// export const updateBlog = async (req: Request, res: Response) => {
//   try {
//     const blog = await Blog.findOne({ _id: req.params.id });

//     if (req.body.title) {
//       Blog.title = req.body.title;
//     }

//     if (req.body.content) {
//       Blog.content = req.body.content;
//     }

//     await Blog.save();
//     res.send(Blog);
//   } catch {
//     res.status(404);
//     res.send({ error: "Blog doesn't exist!" });
//   }
// };

// Delete a specific Blog by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};
