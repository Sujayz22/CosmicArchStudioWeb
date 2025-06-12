export default ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {
            folder: 'cosmic_arch_studio',
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            resource_type: 'auto',
          },
          delete: {
            // Add a small delay before deletion to ensure file is not in use
            delay: 1000,
          },
        },
      },
    },
  });