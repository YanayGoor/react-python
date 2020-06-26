export const setCurrentPackage = (env) => {
    env.setdefault('__name__', 'pythonreact')
    env.setdefault('__package__', 'pythonreact')
}

export const setPackages = (env, packages) => {
    window.pyodide.runPython('import sys', env)
    Object.entries(packages).forEach(
        ([name, p]) => {
            env.setdefault('package', p)
            window.pyodide.runPython(`sys.modules['${name}'] = package`, env)
            window.pyodide.runPython(`del package`, env)
        }
    )
}

export const executeFile = (pythonCode, pyImports, pyPromises) => {
    return Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => {
        const env = window.pyodide.newEnv();
        setCurrentPackage(env)
        setPackages(env, pyImports)
        window.pyodide.runPython(pythonCode, env)
        return window.pyodide.runPython('globals()', env)
    })
}