// Babel config used by Jest (ts-jest handles .ts/.tsx directly,
// but babel-jest handles plain .js/.jsx from monorepo packages).
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
