
export default {
  providers: [
    {
      domain: process.env.JWT_TEMPLATE_ISSUER,
      applicationID: "convex",
    },
  ],
};
