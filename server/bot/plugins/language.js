export function language() {
  return async (ctx, next) => {
    ctx.session.language = ctx.session.user?.language || (ctx.update.message || ctx.update.callback_query).from.language_code;
    await next();
  };
}